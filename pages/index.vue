<template>
    <video-background src="foo.mp4" style="max-height: 80vh; height: 100vh;" overlay="linear-gradient(45deg,#00000099,#00000099)">
        <div class="text-white">
            <h1 class="text-h3 pa-6 ma-2">
                Registros en video del LAIS
            </h1>
            <p class="text-subtitle-1 pa-6 ma-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Ultricies integer quis auctor elit sed vulputate mi sit amet. Vel risus commodo viverra maecenas accumsan lacus vel. Massa sapien faucibus et molestie ac feugiat. Quam vulputate dignissim suspendisse in est ante in nibh. Elit eget gravida cum sociis natoque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Sit amet volutpat consequat mauris nunc congue. Ultrices vitae auctor eu augue. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Purus in massa tempor nec feugiat nisl. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Volutpat maecenas volutpat blandit aliquam etiam. Augue eget arcu dictum varius duis. Rhoncus urna neque viverra justo. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.
            </p>
        </div>

        <v-btn color="primary" class="ma-4">
            <nuxt-link to="/nav" style="text-decoration: none; color: inherit">
                Navegar colección
            </nuxt-link>
        </v-btn>
    
        <!-- TODO: Borrar después de realizar pruebas de colores -->
        <v-btn @click="dialog = true; color = 'primary-container'" color="primary">
            Primary
        </v-btn>
        <v-btn @click="dialog = true; color = 'secondary-container'" color="secondary">
            Secondary
        </v-btn>
        <v-btn @click="dialog = true; color = 'accent-container'" color="accent">
            Accent
        </v-btn>
    </video-background>

    <v-dialog v-model="dialog" width="auto">
        <v-card class="mx-auto" max-width="344" :color="color">
            <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover ></v-img>
            <v-card-title>
                Lorem ipsum odor amet
            </v-card-title>
            <v-card-subtitle>
                Consectetuer adipiscing elit
            </v-card-subtitle>
            <v-card-text>
                Ac hendrerit varius massa condimentum sodales. Etiam habitasse torquent sapien quisque orci. Aliquam suspendisse duis convallis nisi ex, justo suscipit. Quis auctor phasellus, sit nascetur ultrices vivamus fermentum. Sit at ridiculus aliquet dictum purus, gravida dolor id. Mattis lacinia odio pulvinar nascetur diam mi arcu ridiculus.
            </v-card-text>
            <v-card-actions>
                <v-btn variant="flat" color="primary" text="Arcu" ></v-btn>
                <v-btn variant="flat" color="secondary" text="Arcu" ></v-btn>
                <v-btn variant="flat" color="accent" text="Arcu" ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
// TODO: Borrar después de realizar pruebas de colores
const dialog = ref(false)
const show = ref(false)
const color = ref('primary')
</script>