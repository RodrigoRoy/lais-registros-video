<template>
  <v-container>
    <v-row>
      <!-- Contenido principal -->
      <v-col cols="12" sm="9" md="10">
        <v-card class="pa-4">
          <section id="informacion" ref="informacion">
            <v-sheet flat class="pa-4 mb-2">
              
              <h2 :class="activeSection === 'informacion' ? 'text-secondary' : 'text-accent'">Información</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Ultricies integer quis auctor elit sed vulputate mi sit amet. Vel risus commodo viverra maecenas accumsan lacus vel. Massa sapien faucibus et molestie ac feugiat. Quam vulputate dignissim suspendisse in est ante in nibh. Elit eget gravida cum sociis natoque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Sit amet volutpat consequat mauris nunc congue. Ultrices vitae auctor eu augue. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Purus in massa tempor nec feugiat nisl. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Volutpat maecenas volutpat blandit aliquam etiam. Augue eget arcu dictum varius duis. Rhoncus urna neque viverra justo. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.
              </p>
              <p>
                  Diam quis enim lobortis scelerisque fermentum dui. At auctor urna nunc id cursus metus aliquam. Sit amet nulla facilisi morbi tempus iaculis urna id. Integer feugiat scelerisque varius morbi enim. Sit amet volutpat consequat mauris nunc congue nisi. Sagittis orci a scelerisque purus semper eget duis. Mi sit amet mauris commodo quis imperdiet. Urna condimentum mattis pellentesque id nibh. Viverra orci sagittis eu volutpat odio facilisis mauris. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Duis at consectetur lorem donec massa sapien faucibus. Eget nunc scelerisque viverra mauris in. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Aliquam malesuada bibendum arcu vitae elementum curabitur. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Interdum varius sit amet mattis.
              </p>
            </v-sheet>
          </section>

          <section id="documentacion" ref="documentacion">
            <v-sheet flat class="pa-4 mb-2">
              
              <h2 :class="activeSection === 'documentacion' ? 'text-secondary' : 'text-accent'">Documentación</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Ultricies integer quis auctor elit sed vulputate mi sit amet. Vel risus commodo viverra maecenas accumsan lacus vel. Massa sapien faucibus et molestie ac feugiat. Quam vulputate dignissim suspendisse in est ante in nibh. Elit eget gravida cum sociis natoque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Sit amet volutpat consequat mauris nunc congue. Ultrices vitae auctor eu augue. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Purus in massa tempor nec feugiat nisl. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Volutpat maecenas volutpat blandit aliquam etiam. Augue eget arcu dictum varius duis. Rhoncus urna neque viverra justo. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.
              </p>
              <p>
                  Diam quis enim lobortis scelerisque fermentum dui. At auctor urna nunc id cursus metus aliquam. Sit amet nulla facilisi morbi tempus iaculis urna id. Integer feugiat scelerisque varius morbi enim. Sit amet volutpat consequat mauris nunc congue nisi. Sagittis orci a scelerisque purus semper eget duis. Mi sit amet mauris commodo quis imperdiet. Urna condimentum mattis pellentesque id nibh. Viverra orci sagittis eu volutpat odio facilisis mauris. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Duis at consectetur lorem donec massa sapien faucibus. Eget nunc scelerisque viverra mauris in. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Aliquam malesuada bibendum arcu vitae elementum curabitur. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Interdum varius sit amet mattis.
              </p>
            </v-sheet>
          </section>

          <section id="creditos" ref="creditos">
            <v-sheet flat class="pa-4 mb-2">
              
              <h2 :class="activeSection === 'creditos' ? 'text-secondary' : 'text-accent'">Créditos</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Ultricies integer quis auctor elit sed vulputate mi sit amet. Vel risus commodo viverra maecenas accumsan lacus vel. Massa sapien faucibus et molestie ac feugiat. Quam vulputate dignissim suspendisse in est ante in nibh. Elit eget gravida cum sociis natoque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Sit amet volutpat consequat mauris nunc congue. Ultrices vitae auctor eu augue. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Purus in massa tempor nec feugiat nisl. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Volutpat maecenas volutpat blandit aliquam etiam. Augue eget arcu dictum varius duis. Rhoncus urna neque viverra justo. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.
              </p>
              <p>
                  Diam quis enim lobortis scelerisque fermentum dui. At auctor urna nunc id cursus metus aliquam. Sit amet nulla facilisi morbi tempus iaculis urna id. Integer feugiat scelerisque varius morbi enim. Sit amet volutpat consequat mauris nunc congue nisi. Sagittis orci a scelerisque purus semper eget duis. Mi sit amet mauris commodo quis imperdiet. Urna condimentum mattis pellentesque id nibh. Viverra orci sagittis eu volutpat odio facilisis mauris. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Duis at consectetur lorem donec massa sapien faucibus. Eget nunc scelerisque viverra mauris in. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Aliquam malesuada bibendum arcu vitae elementum curabitur. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Interdum varius sit amet mattis.
              </p>
            </v-sheet>
          </section>
        </v-card>
      </v-col>

      <!-- Menú lateral scrolleable a la derecha -->
      <v-col cols="3" md="2" class="mr-10 text-center d-none d-sm-block sticky-menu">
        <v-list density="compact" :lines="false" nav>
          <v-list-item :class="activeSection === 'informacion' ? 'bg-blue-lighten-3' : 'bg-yellow-lighten-2'"
                        href="#informacion" @click="handleClick('informacion', $event)">
            <v-list-item-title >
              Información
            </v-list-item-title>
          </v-list-item>

          <v-list-item :class="activeSection === 'documentacion' ? 'bg-blue-lighten-3' : 'bg-yellow-lighten-2'"
                          href="#documentacion" @click="handleClick('documentacion', $event)">
            <v-list-item-title >
              Documentación
            </v-list-item-title>
          </v-list-item>

          <v-list-item :class="activeSection === 'creditos' ? 'bg-blue-lighten-3' : 'bg-yellow-lighten-2'"
                        href="#creditos" @click="handleClick('creditos', $event)">
            <v-list-item-title >
              Créditos
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const activeSection = ref('');

const sections = {
  informacion: ref(null),
  documentacion: ref(null),
  creditos: ref(null),
};

const scrollTo = async (sectionId) => {
  await nextTick(); // Asegura que el DOM esté completamente renderizado

  const section = document.getElementById(sectionId);
  if (section) {
    // Obtener la altura del App Bar
    const appBarHeight = 100;
    
    // Calcular la posición de la sección y restar la altura del App Bar
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY - appBarHeight;

    setTimeout(() => {
      window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
    }, 100); // Pequeña pausa para asegurarnos de que todo está listo antes de hacer scroll
  }
};

// Función que maneja el clic, previniendo el comportamiento predeterminado
const handleClick = (sectionId, event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace
  scrollTo(sectionId);    // Llama a la función de scroll personalizada
};

onMounted(() => {
  const route = useRoute();
  const hash = route.hash.replace('#', ''); // Remueve el #

  if (hash && document.getElementById(hash)) {
    scrollTo(hash); // Hace scroll a la sección correspondiente en la carga inicial
  }

  const checkActiveSection = () => {
    const scrollPosition = window.scrollY + 300; // Offset para la altura del App Bar

    // Recorre las secciones y actualiza activeSection
    Object.keys(sections).forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Verifica si el scroll está en la sección actual
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          activeSection.value = sectionId;
          // Actualiza la URL con el hash de la sección
          if (window.location.hash !== `#${sectionId}`) {
            window.history.replaceState(null, '', `#${sectionId}`);
          }
        }
      }
    });
  };

  // Escucha el evento de scroll
  window.addEventListener('scroll', checkActiveSection);

  // Limpieza al desmontar el componente
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', checkActiveSection);
  });

});
</script>

<style scoped>
.sticky-menu {
  position: fixed;
  top: 70px;
  right: 0;
}
</style>