<template>
    <v-card>
      <v-tabs v-model="tab" align-tabs="center" >
        <v-tab value="one">Proyecto</v-tab>
        <v-tab value="two">Documentación</v-tab>
        <v-tab value="three">Créditos</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Ultricies integer quis auctor elit sed vulputate mi sit amet. Vel risus commodo viverra maecenas accumsan lacus vel. Massa sapien faucibus et molestie ac feugiat. Quam vulputate dignissim suspendisse in est ante in nibh. Elit eget gravida cum sociis natoque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Sit amet volutpat consequat mauris nunc congue. Ultrices vitae auctor eu augue. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Purus in massa tempor nec feugiat nisl. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Volutpat maecenas volutpat blandit aliquam etiam. Augue eget arcu dictum varius duis. Rhoncus urna neque viverra justo. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.
            </p>
            <p>
                Diam quis enim lobortis scelerisque fermentum dui. At auctor urna nunc id cursus metus aliquam. Sit amet nulla facilisi morbi tempus iaculis urna id. Integer feugiat scelerisque varius morbi enim. Sit amet volutpat consequat mauris nunc congue nisi. Sagittis orci a scelerisque purus semper eget duis. Mi sit amet mauris commodo quis imperdiet. Urna condimentum mattis pellentesque id nibh. Viverra orci sagittis eu volutpat odio facilisis mauris. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Duis at consectetur lorem donec massa sapien faucibus. Eget nunc scelerisque viverra mauris in. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Aliquam malesuada bibendum arcu vitae elementum curabitur. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Interdum varius sit amet mattis.
            </p>
          </v-window-item>
  
          <v-window-item value="two">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Ultricies integer quis auctor elit sed vulputate mi sit amet. Vel risus commodo viverra maecenas accumsan lacus vel. Massa sapien faucibus et molestie ac feugiat. Quam vulputate dignissim suspendisse in est ante in nibh. Elit eget gravida cum sociis natoque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Sit amet volutpat consequat mauris nunc congue. Ultrices vitae auctor eu augue. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Purus in massa tempor nec feugiat nisl. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Volutpat maecenas volutpat blandit aliquam etiam. Augue eget arcu dictum varius duis. Rhoncus urna neque viverra justo. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.
            </p>
            <p>
                Diam quis enim lobortis scelerisque fermentum dui. At auctor urna nunc id cursus metus aliquam. Sit amet nulla facilisi morbi tempus iaculis urna id. Integer feugiat scelerisque varius morbi enim. Sit amet volutpat consequat mauris nunc congue nisi. Sagittis orci a scelerisque purus semper eget duis. Mi sit amet mauris commodo quis imperdiet. Urna condimentum mattis pellentesque id nibh. Viverra orci sagittis eu volutpat odio facilisis mauris. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Duis at consectetur lorem donec massa sapien faucibus. Eget nunc scelerisque viverra mauris in. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Aliquam malesuada bibendum arcu vitae elementum curabitur. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Interdum varius sit amet mattis.
            </p>
          </v-window-item>
  
          <v-window-item value="three">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Ultricies integer quis auctor elit sed vulputate mi sit amet. Vel risus commodo viverra maecenas accumsan lacus vel. Massa sapien faucibus et molestie ac feugiat. Quam vulputate dignissim suspendisse in est ante in nibh. Elit eget gravida cum sociis natoque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Sit amet volutpat consequat mauris nunc congue. Ultrices vitae auctor eu augue. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Purus in massa tempor nec feugiat nisl. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Volutpat maecenas volutpat blandit aliquam etiam. Augue eget arcu dictum varius duis. Rhoncus urna neque viverra justo. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.
            </p>
            <p>
                Diam quis enim lobortis scelerisque fermentum dui. At auctor urna nunc id cursus metus aliquam. Sit amet nulla facilisi morbi tempus iaculis urna id. Integer feugiat scelerisque varius morbi enim. Sit amet volutpat consequat mauris nunc congue nisi. Sagittis orci a scelerisque purus semper eget duis. Mi sit amet mauris commodo quis imperdiet. Urna condimentum mattis pellentesque id nibh. Viverra orci sagittis eu volutpat odio facilisis mauris. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Duis at consectetur lorem donec massa sapien faucibus. Eget nunc scelerisque viverra mauris in. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Aliquam malesuada bibendum arcu vitae elementum curabitur. Donec adipiscing tristique risus nec feugiat in fermentum posuere urna. Interdum varius sit amet mattis.
            </p>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>

<script setup>
const tab = ref(null)
</script>