import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contact-service';
import { Contact } from '../../interfaces/contacto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage implements OnInit {
  contactsService = inject(ContactsService);
  contactId = input.required<string>();
  
  contact: Contact | null = null;

  async ngOnInit() {
    const id = this.contactId();
    this.contact = await this.contactsService.getContactById(id);
  }
}
