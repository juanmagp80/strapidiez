module.exports = {
    async afterCreate(event) {
        const { result } = event;
        console.log('After Create Event:', result.id); // Log para depuración

        // Verificar si la noticia está en modo borrador
        if (result.publishedAt) {
            console.log(`Skipping afterCreate for published news: ${result.id}`);
            return;
        }

        // Verificar si el registro ya existe en Supabase
        const existingEntry = await strapi.db.query('api::new.new').findOne({
            where: { id: result.id }
        });

        // Si ya existe, no crear duplicado
        if (!existingEntry) {
            console.log(`Creating news entry with ID: ${result.id}`);

            if (result.image && result.image.url) {
                const imageUrl = result.image.url;
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
        } else {
            console.log(`Skipping creation, entry already exists for ID: ${result.id}`);
        }
    },

    async afterUpdate(event) {
        const { result } = event;
        console.log('After Update Event:', result.id); // Log para depuración

        // Verificar si el registro ya tiene la URL de la imagen actualizada
        if (result.image && result.image.url) {
            const imageUrl = result.image.url;
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
