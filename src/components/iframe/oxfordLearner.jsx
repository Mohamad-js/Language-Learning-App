// app/components/IframeComponent.jsx
export default function OxfordLearner() {
  return (
    <div>
      <h1>Oxford Learners Dictionary</h1>
      <iframe
        src="https://www.oxfordlearnersdictionaries.com/us/"
        title="Example Website"
        width="100%"
        height="500px"
        style={{ border: "none" }}
        allowFullScreen
      />
    </div>
  );
}