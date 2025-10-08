import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contacto';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  authService = inject(Auth);
  readonly URL_BASE = "https://agenda-api.somee.com/api/contacts";
  
  /** Lista de contactos en memoria */
  contacts:Contact[] = [];

  /** Crea un contacto */
  async createContact(nuevoContacto:NewContact) {
    const res = await fetch(this.URL_BASE, 
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+this.authService.token,
        },
        body: JSON.stringify(nuevoContacto)
      });
    if(!res.ok) return;
    const resContact:Contact = await res.json();
    this.contacts.push(resContact);
    return resContact;
  }

  /** Elimina un contacto segun su ID */
  async deleteContact(id:number){
    this.contacts = this.contacts.filter(contacto => contacto.id !== id);
    try {
    const res = await fetch(`${this.URL_BASE}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,
      }
    });
    if (res.ok) {
      this.contacts = this.contacts.filter(contacto => contacto.id !== id);
      console.log(`Contacto ${id} eliminado correctamente`);
      return true;
    } else {
      console.error(`Error al eliminar contacto ${id}: ${res.status}`);
      return false;
    }
    } catch (error) {
      console.error('Error de conexión al eliminar contacto:', error);
      return false;
    }
    /**       ////////////////////////////////////////////////////////////////     */
  }

    /** Marca un contacto como favorito */
  async setFavorite(contactId: number) {
    const res = await fetch(`${this.URL_BASE}/${contactId}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,
      }
    });
    if (!res.ok) return false;
    
    // Actualizar localmente
    const contact = this.contacts.find(c => c.id === contactId);
    if (contact) {
      contact.isFavorite = true;
    }
    return true;
  }

  async editContact(contact:Contact){
    const res = await fetch(this.URL_BASE+"/"+contact.id, 
      {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+this.authService.token,
        },
        body: JSON.stringify(contact)
      });
    if(!res.ok) return;
    /** Actualizo la lista de leads locales para dejar el lead que actualice actualizado */
    this.contacts = this.contacts.map(oldContact =>{
      if(oldContact.id === contact.id) return contact;
      return oldContact
    })
    return contact;
  }

  /** Obtiene los contactos del backend */
  async getContacts(){
    const res = await fetch('https://agenda-api.somee.com/api/Contacts',
      {
        method: "GET",
        headers: {
          Authorization: "Bearer "+this.authService.token
        }
      })
      if(res.ok){
        const resJson:Contact[] = await res.json()
        this.contacts = resJson;
      }
  }

  async getContactById(id:string | number){
    const res = await fetch('https://agenda-api.somee.com/api/Contacts/'+id, //
      {
        method: "GET",
        headers: {
          Authorization: "Bearer "+this.authService.token
        }
      })
      if(res.ok){
        const resJson:Contact = await res.json()
        return resJson;
      }
      return null
  }
}

