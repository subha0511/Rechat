const Hero = ({ signOutHandler }) => {
  return (
    <div>
      <h1>bwa</h1>
      <button
        onClick={() => {
          signOutHandler();
        }}
      >
        signOut
      </button>
    </div>
  );
};
export default Hero;
