<template>
  <div id="Ckeditor">
    <vue-editor id="tdt-editor" :editorOptions="editorSettings" v-model="casesOption.content" ></vue-editor>

    <button @click="_onSubmit">Submit</button>

    <div v-html="casesOption.content"></div>
  </div>
</template>

<script lang="js" src="./Ckeditor.js"></script>
<style lang="css" src="./Ckeditor.css"></style>
