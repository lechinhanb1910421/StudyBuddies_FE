<template lang="">
  <nav class="navbar navbar-expand-lg bg_dark1 fixed-top">
    <div class="container-fluid">
      <img src="../assets/logo.png" class="avatar_img" alt="Avatar" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex">
          <div class="input-group navbar_search_inp">
            <span><i class="fas fa-search search_icon"></i></span>
            <input type="text" class="form-control navbar_input_search" placeholder="Search StudyBuddies..." />
          </div>
        </div>
        <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>

        <i class="fas fa-ellipsis-h navbar_icons"></i>
        <i class="fas fa-bell navbar_icons"></i>
        <img src="../assets/Ganyu_2.jpeg" class="avatar_img" alt="Avatar" />
      </div>
    </div>
  </nav>
</template>
<script>
export default {}
</script>
<style scoped>
.search_icon {
  color: white;
  font-size: 20px;
  opacity: 0.5;
  padding: 12px 0 12px 12px;
}
.navbar-brand {
  color: white !important;
}
.bg_dark1 {
  background-color: #2b2e33;
}
.navbar_search_inp {
  margin-left: 20px;
  background-color: rgb(255 255 255 / 0.1);
  border-radius: 1.5rem;
  min-width: 300px;
}
.navbar_search_inp input[type='text'] {
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
  outline: none;
}
.navbar_input_search:focus {
  outline: none;
  box-shadow: none;
}
.navbar_search_inp input[type='text']::placeholder {
  color: white;
  opacity: 50%;
}
.navbar_icons {
  color: white;
  margin-inline-start: 10px;
  padding: 12px;
  font-size: 20px;
  border-radius: 50%;
  background-color: rgb(255 255 255 / 0.1);
}
.navbar {
  border: 1px solid rgb(255 255 255 /0.2);
}
.avatar_img {
  margin-inline-start: 10px;
  height: 45px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
