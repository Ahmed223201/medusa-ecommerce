import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  constructor() {}

  async getProducts(): Promise<Product[]> {
    try {
      const productsCollection = collection(this.db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      return productsSnapshot.docs.map(doc => {
        const data = doc.data() as Omit<Product, 'id'>;
        return {
          id: doc.id,
          ...data
        };
      });
    } catch (error) {
      console.error('Error fetching products from Firebase:', error);
      return [];
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const productDoc = doc(this.db, 'products', id);
      const productSnapshot = await getDoc(productDoc);
      
      if (!productSnapshot.exists()) {
        return null;
      }
      
      const data = productSnapshot.data() as Omit<Product, 'id'>;
      return {
        id: productSnapshot.id,
        ...data
      };
    } catch (error) {
      console.error(`Error fetching product ${id} from Firebase:`, error);
      return null;
    }
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<string | null> {
    try {
      // Remove undefined fields
      const sanitizedProduct = Object.fromEntries(
        Object.entries(product).filter(([_, v]) => v !== undefined)
      );
      console.log('Adding product to Firestore:', sanitizedProduct);
      const productsCollection = collection(this.db, 'products');
      const docRef = await addDoc(productsCollection, sanitizedProduct);
      return docRef.id;
    } catch (error) {
      console.error('Error adding product to Firebase:', error);
      return null;
    }
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<boolean> {
    try {
      const productDoc = doc(this.db, 'products', id);
      await updateDoc(productDoc, product as any);
      return true;
    } catch (error) {
      console.error(`Error updating product ${id} in Firebase:`, error);
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const productDoc = doc(this.db, 'products', id);
      await deleteDoc(productDoc);
      return true;
    } catch (error) {
      console.error(`Error deleting product ${id} from Firebase:`, error);
      return false;
    }
  }

  // Save purchase history to Firestore under 'transactions' collection
  async savePurchaseHistory(purchase: {
    fullName: string;
    phoneNumber: string;
    items: any[];
    total: number;
    createdAt: string;
  }): Promise<string | null> {
    try {
      const transactionsCollection = collection(this.db, 'transactions');
      const docRef = await addDoc(transactionsCollection, purchase);
      return docRef.id;
    } catch (error) {
      console.error('Error saving purchase to transactions:', error);
      return null;
    }
  }

  // Get all transactions from Firestore
  async getTransactions(): Promise<any[]> {
    try {
      const transactionsCollection = collection(this.db, 'transactions');
      const snapshot = await getDocs(transactionsCollection);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }
}
