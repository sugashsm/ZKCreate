// src/ipfsService.js
import { create } from 'ipfs-http-client';

const ipfs = create({ 
  host: 'ipfs.infura.io', 
  port: 5001, 
  protocol: 'https' 
});

export const uploadFileToIPFS = async (file) => {
  try {
    const added = await ipfs.add(file);
    console.log('IPFS Hash:', added.path); // IPFS path (hash) of the uploaded file
    return added.path; // Return the IPFS hash
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    return null;
  }
};
