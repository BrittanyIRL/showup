export default function Account() {
  return (
    <div>
      Inside Account - Display posters created by this user. Below poster
      instances show 'edit' and 'delete'
      <button
        type="button"
        onClick={() => {
          console.log("todo, create new show");
        }}
      >
        Add New Show
      </button>
    </div>
  );
}
