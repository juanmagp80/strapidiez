module.exports = {
    async afterCreate(event) {
        const { result } = event;
        console.log('After Create Event:', result); // Log para depuración

        if (result.image && result.image.url) {
            const imageUrl = result.image.url; // Obtén la URL de Cloudinary
            console.log('Uploading image URL:', imageUrl); // Log para depuración

            try {
                await strapi.db.query('api::new.new').update({
                    where: { id: result.id },
                    data: { image_url: imageUrl }, // Asegúrate de que este campo exista en tu modelo
                });
                console.log('Image URL updated successfully.'); // Log de éxito
            } catch (error) {
                console.error('Error updating image URL:', error); // Log de error
            }
        } else {
            console.log('No image found in the result.'); // Log si no se encuentra la imagen
        }
    },

    async afterUpdate(event) {
        const { result } = event;
        console.log('After Update Event:', result); // Log para depuración

        if (result.image && result.image.url) {
            const imageUrl = result.image.url; // Obtén la URL de Cloudinary
            console.log('Updating image URL:', imageUrl); // Log para depuración

            try {
                await strapi.db.query('api::new.new').update({
                    where: { id: result.id },
                    data: { image_url: imageUrl }, // Asegúrate de que este campo exista en tu modelo
                });
                console.log('Image URL updated successfully.'); // Log de éxito
            } catch (error) {
                console.error('Error updating image URL:', error); // Log de error
            }
        } else {
            console.log('No image found in the result.'); // Log si no se encuentra la imagen
        }
    },
};
