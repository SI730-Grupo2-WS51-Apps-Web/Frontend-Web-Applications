<template>
    <nv-galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
    :showItemNavigators="true" :showThumbnails="false">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
    </template>
</nv-galleria>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          itemImageSrc: require('@/landing/images/bg-seto-kaiba.svg'), // Usando require para cargar la imagen
          alt: 'Descripción de la imagen 1',
          
        },
        // Agrega más objetos para más imágenes
      ],
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 3,
        },
        {
          breakpoint: '768px',
          numVisible: 2,
        },
        {
          breakpoint: '560px',
          numVisible: 1,
        },
      ],
    };
  },
};
</script>
