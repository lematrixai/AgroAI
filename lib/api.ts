
export const validateLeafHealth = async (photoUri: string): Promise<'healthy' | 'affected' | null> => {
    try {
      // Prepare the image data for sending
      const formData = new FormData();
      formData.append('file', {
        uri: photoUri,
        type: 'image/jpeg',
        name: 'leaf_photo.jpg',
      } as any);
  
      // Replace this URL with your actual backend URL
      const apiUrl = 'https://your-backend-api.com/predict-leaf';
  
      // Send the image to the backend API
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      // Parse the response from the model
      const data = await res.json();
  
      // Assuming the backend returns a field `prediction` that indicates whether the leaf is healthy or affected
      if (data.prediction === 'healthy') {
        return 'healthy';
      } else if (data.prediction === 'affected') {
        return 'affected';
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error during leaf health prediction', error);
      return null; // Return null if there's an error
    }
  };
  