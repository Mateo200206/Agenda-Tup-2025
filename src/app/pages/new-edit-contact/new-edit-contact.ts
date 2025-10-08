import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contact-service';
import { Router } from '@angular/router';
import { Contact, NewContact } from '../../interfaces/contacto';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  idContacto = input<string>();
  contactoBack:Contact | undefined = undefined;
  form = viewChild<NgForm>("newContactForm")
  solicitudABackEnCurso = true
  
  async ngOnInit() {
    if(this.idContacto()){
      const contacto:Contact|null = await this.contactsService.getContactById(this.idContacto()!);
      if(contacto){
        this.contactoBack = contacto;
        this.form()?.setValue({
          address: contacto.address,
          company: contacto.company,
          email: contacto.email,
          firstName:contacto.firstName,
          image:contacto.image,
          isFavorite:contacto.isFavorite,
          lastName: contacto.lastName,
          number: contacto.number
        })
      }
    }
  }

  async handleFormSubmission(form: NgForm) {
  this.errorEnBack = false;
  const nuevoContacto: NewContact = {
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    address: form.value.address,
    email: form.value.email,
    image: form.value.image,
    number: form.value.number,
    company: form.value.company,
    isFavorite: form.value.isFavorite
  }

  console.log('Enviando contacto:', nuevoContacto);

  this.solicitudABackEnCurso = true;
  let res;
  if (this.idContacto()) {
    res = await this.contactsService.editContact({...nuevoContacto, id: this.contactoBack!.id});
  } else {
    res = await this.contactsService.createContact(nuevoContacto);
  }
  this.solicitudABackEnCurso = false;

  console.log('Respuesta después de crear:', res);

  if (!res) {
    this.errorEnBack = true;
    return;
  }

  // MARCAR COMO FAVORITO SI EL CHECKBOX ESTABA MARCADO
  if (nuevoContacto.isFavorite) {
    const favoritoOk = await this.contactsService.setFavorite(res.id);
    console.log('setFavorite resultado:', favoritoOk);
  }

  // Volver a obtener el contacto para verificar
  const contactoFinal = await this.contactsService.getContactById(res.id);
  console.log('Contacto final:', contactoFinal);

  this.router.navigate(["/contacts", res.id]);
}
}