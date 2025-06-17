export const mockContracts = [
  // Contrats pour le bien 1
  {
    id: '1',
    type: 'mandate',
    title: 'Mandat de vente exclusif LoopImmo',
    propertyId: '1',
    status: 'signed',
    parties: [
      { name: 'Jean Dupont', role: 'Vendeur', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) },
      { name: 'LoopImmo', role: 'Mandataire', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 31),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    documents: [
      { name: 'Mandat_vente_signe.pdf', type: 'pdf', size: '2.3 MB', url: '#' }
    ],
    keyInfo: {
      commission: 4990,
      exclusivityEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    }
  },
  {
    id: '2',
    type: 'promise',
    title: 'Promesse de vente - Marie Dubois',
    propertyId: '1',
    status: 'pending_signature',
    parties: [
      { name: 'Jean Dupont', role: 'Vendeur', signed: false },
      { name: 'Marie Dubois', role: 'Acheteur', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { name: 'Me. Martin', role: 'Notaire', signed: false }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    documents: [
      { name: 'Promesse_vente_v2.pdf', type: 'pdf', size: '3.1 MB', url: '#' },
      { name: 'Annexes_diagnostics.pdf', type: 'pdf', size: '5.4 MB', url: '#' }
    ],
    keyInfo: {
      price: 315000,
      notary: 'Me. Martin - Paris 11',
      completionDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    }
  },
  // Contrats pour le bien 2
  {
    id: '3',
    type: 'mandate',
    title: 'Mandat de vente exclusif LoopImmo',
    propertyId: '2',
    status: 'signed',
    parties: [
      { name: 'Jean Dupont', role: 'Vendeur', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45) },
      { name: 'LoopImmo', role: 'Mandataire', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45) }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 46),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    documents: [
      { name: 'Mandat_vente_signe.pdf', type: 'pdf', size: '2.3 MB', url: '#' }
    ],
    keyInfo: {
      commission: 6000,
      exclusivityEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45)
    }
  },
  // Contrat pour le bien 3
  {
    id: '4',
    type: 'mandate',
    title: 'Mandat de vente exclusif LoopImmo',
    propertyId: '3',
    status: 'expired',
    parties: [
      { name: 'Jean Dupont', role: 'Vendeur', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 100) },
      { name: 'LoopImmo', role: 'Mandataire', signed: true, signedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 100) }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 101),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 100),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    documents: [
      { name: 'Mandat_vente_signe.pdf', type: 'pdf', size: '2.3 MB', url: '#' }
    ],
    keyInfo: {
      commission: 2500,
      exclusivityEnd: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
    }
  }
];
