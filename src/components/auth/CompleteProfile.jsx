'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import { useAuth } from '@/app/context/AuthProvider';

const MAX_SIZE_MB = 2;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function CompleteProfile() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [googleImage, setGoogleImage] = useState('');   // fallback from Google
    const [imageFile, setImageFile] = useState(null);     // file chosen by the user
    const [previewUrl, setPreviewUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setFullName(user.user_metadata?.full_name || '');
            setUsername(user.user_metadata?.username || '');
            setGoogleImage(user.user_metadata?.picture || '');
        }
    }, [user]);

    // Create / clean up the local preview URL
    useEffect(() => {
        if (!imageFile) {
            setPreviewUrl('');
            return;
        }
        const url = URL.createObjectURL(imageFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            toast.error('Please choose a JPG, PNG or WebP image');
            event.target.value = '';
            return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            toast.error(`Image must be smaller than ${MAX_SIZE_MB} MB`);
            event.target.value = '';
            return;
        }
        setImageFile(file);
    };

    const removeSelectedFile = () => {
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const uploadAvatar = async (supabase) => {
        const ext = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
        const path = `${user.id}/avatar-${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(path, imageFile, {
                cacheControl: '3600',
                upsert: true,
                contentType: imageFile.type,
            });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('avatars').getPublicUrl(path);
        return data.publicUrl;
    };

    const handleCompleteProfile = async (event) => {
        event.preventDefault();
        const supabase = getSupabaseBrowserClient();
        if (!supabase || !user) return;

        if (!imageFile && !googleImage) {
            toast.error('Please upload a profile image');
            return;
        }

        setIsSubmitting(true);

        try {
            // Check if username already exists
            const { data: existingUser } = await supabase
                .from('profiles')
                .select('id')
                .eq('username', username)
                .maybeSingle();

            if (existingUser) {
                toast.error('Username already taken');
                return;
            }

            // Upload the chosen image (if any), otherwise fall back to the Google picture
            let profileImage = googleImage;
            if (imageFile) {
                try {
                    profileImage = await uploadAvatar(supabase);
                } catch (err) {
                    toast.error(`Image upload failed: ${err.message}`);
                    return;
                }
            }

            const { error } = await supabase.from('profiles').insert({
                id: user.id,
                username,
                full_name: fullName,
                email: user.email,
                profile_image_url: profileImage,
            });

            if (error) {
                if (imageFile) {
                    const uploadedPath = profileImage.split('/avatars/')[1];
                    if (uploadedPath) await supabase.storage.from('avatars').remove([uploadedPath]);
                }
                if (error.code === '23505') {
                    toast.error('Username already taken');
                } else {
                    toast.error(`Error: ${error.message}`);
                }
                return;
            }

            toast.success('Profile completed!');
            window.location.reload();
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    const displayedImage = previewUrl || googleImage;

    return (
        <section className="relative mx-auto w-full max-w-md rounded-3xl border border-foreground/10 bg-background p-7 shadow-xl">
            <h1 className="text-2xl font-semibold">Complete your profile</h1>
            <p className="mt-2 text-sm text-foreground/60">Just a few more details to get started</p>

            <form className="flex flex-col gap-3 mt-6" onSubmit={handleCompleteProfile}>
                {/* Avatar picker */}
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-foreground/15 bg-foreground/5">
                        {displayedImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={displayedImage} alt="Profile preview" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-foreground/40">
                                No image
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 text-sm">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileChange}
                            className="hidden"
                            id="profile-image-input"
                        />
                        <label
                            htmlFor="profile-image-input"
                            className="cursor-pointer rounded-xl border border-foreground/15 px-3 py-2 text-center hover:bg-foreground/5"
                        >
                            {imageFile ? 'Change image' : 'Upload image'}
                        </label>
                        {imageFile && (
                            <button
                                type="button"
                                onClick={removeSelectedFile}
                                className="text-xs text-foreground/60 underline"
                            >
                                Remove selected image
                            </button>
                        )}
                        <span className="text-xs text-foreground/50">JPG, PNG or WebP, max {MAX_SIZE_MB} MB</span>
                    </div>
                </div>

                <label className="flex flex-col gap-1.5 text-sm">
                    Full Name
                    <input
                        className="rounded-xl border border-foreground/15 bg-transparent px-3 py-2.5"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                    />
                </label>

                <label className="flex flex-col gap-1.5 text-sm">
                    Username
                    <input
                        className="rounded-xl border border-foreground/15 bg-transparent px-3 py-2.5"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        minLength={3}
                        maxLength={30}
                        pattern="[A-Za-z0-9]+"
                        title="Letters and numbers only"
                        placeholder="Choose a unique username"
                        required
                    />
                    <span className="text-xs text-foreground/50">3-30 characters, letters and numbers only</span>
                </label>

                <button
                    className="primary-btn mt-4 disabled:opacity-60"
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? 'Saving…' : 'Complete Profile'}
                </button>
            </form>
        </section>
    );
}