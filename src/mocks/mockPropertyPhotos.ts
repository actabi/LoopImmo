export const mockPropertyPhotos = {
  propertyId: '1',
  propertyTitle: 'Appartement 3 pièces lumineux',
  propertyAddress: '15 rue de la Paix, Lyon 7e',
  photos: [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      title: 'Salon principal',
      isCover: true,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      title: 'Cuisine équipée',
      isCover: false,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      title: 'Chambre principale',
      isCover: false,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
    }
  ]
};
