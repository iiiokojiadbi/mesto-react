export default function () {
  const userName = document.querySelector('.profile__user-name');
  const userHobby = document.querySelector('.profile__user-hobby');
  const newName = document.querySelector('.profile-edit__name');
  const newHobby = document.querySelector('.profile-edit__hobby');

  userName.textContent = newName.value;
  userHobby.textContent = newHobby.value;
}