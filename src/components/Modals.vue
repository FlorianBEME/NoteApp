<template>
  <TransitionRoot :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="
          flex
          items-center
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <!-- <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        > -->
        <DialogOverlay class="fixed inset-0 bg-opacity-75 transition-opacity" />
        <!-- </TransitionChild> -->

        <!-- This element is to trick the browser into centering the modal contents. -->
        <!-- <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        > -->
        <!-- <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        > -->
        <div
          class="
            inline-block
            align-bottom
            bg-opacity-custom
            rounded-lg
            px-4
            pt-5
            pb-4
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6
          "
        >
          <div>
            <div class="">
              <DialogTitle
                as="h3"
                class="
                  mb-5
                  font-custom
                  text-dark text-xl
                  uppercase
                  leading-6
                  text-center
                  font-medium
                  text-gray-900
                  font-primary-font
                "
              >
                Ajout d'une nouvelle note
              </DialogTitle>
              <div class="mt-2">
                <form @submit.prevent="addNewNote()">
                  <div class="sm:overflow-hidden">
                    <div
                      class="px-4 bg-transparent space-y-6 font-secondary-font"
                    >
                      <div>
                        <label
                          for="about"
                          class="block text-lg font-medium text-darktheme"
                        >
                          Titre
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="newNote.title"
                            id="titre"
                            name="titre"
                            type="text"
                            class="
                              shadow-sm
                              h-9
                              p-2
                              mt-1
                              block
                              w-full
                              sm:text-sm
                              border border-gray-300
                              rounded-md
                            "
                            placeholder="Course"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          for="about"
                          class="block text-lg font-medium text-darktheme"
                        >
                          Texte
                        </label>
                        <div class="mt-1">
                          <textarea
                            required
                            v-model="newNote.text"
                            id="about"
                            name="about"
                            rows="3"
                            class="
                              shadow-sm
                              mt-1
                              p-2
                              block
                              w-full
                              sm:text-sm
                              border border-gray-300
                              rounded-md
                            "
                            placeholder="riz lait pates"
                          ></textarea>
                        </div>
                      </div>
                      <div class="flex sm:justify-between sm:flex-row flex-col">
                        <button
                          required
                          type="button"
                          @click="this.$emit('closemodal')"
                          class="
                            inline-flex
                            justify-center
                            py-2
                            px-4
                            border border-transparent
                            shadow-sm
                            text-sm
                            font-medium
                            rounded-md
                            text-white
                            bg-greytheme
                          "
                        >
                          Retour
                        </button>
                        <button
                          type="submit"
                          class="
                            inline-flex
                            justify-center
                            py-2
                            px-4
                            border border-transparent
                            shadow-sm
                            text-sm
                            font-medium
                            rounded-md
                            text-white
                            hover:bg-greytheme
                            bg-darktheme
                          "
                        >
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- </TransitionChild> -->
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionRoot,
} from "@headlessui/vue";

const fs = require("fs");
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Modals",
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,

    TransitionRoot,
  },
  props: {
    open: Boolean,
    data: Object,
    path: String,
  },
  data() {
    return {
      newNote: { uuid: null, title: "", text: "", tags: [] },
    };
  },
  methods: {
    addNewNote() {
      console.log(this.path);
      if (this.data.save) {
        if (this.newNote.title.length > 0 && this.newNote.text.length > 0) {
          this.newNote.uuid = uuidv4();
          fs.readFile(`${this.path}/data.json`, "utf8", (err) => {
            if (err) {
              console.error(err);
              return;
            }
            let dataInJSON = { ...this.data };
            dataInJSON.save.push(this.newNote);
            const dataConvertedJSON = JSON.stringify(dataInJSON);
            fs.writeFileSync(
              `${this.path}/data.json`,
              dataConvertedJSON,
              (err) => {
                if (err) {
                  console.log(err);
                  return;
                } else {
                  this.$emit("update");
                }
              }
            );
            this.newNote = { title: "", text: "", tags: [], uuid: null };
            this.$emit("closemodal");
          });
        }
      } else {
        console.log(
          "Erreur dans l'initialisation du fichier data.json à l'ouverture du programe"
        );
      }
    },
  },
};
</script>
<style>
.bg-opacity-custom {
  background: rgba(106, 138, 166, 0.25);
  backdrop-filter: blur(76.67px);
  border-radius: 25px;
}
</style>
