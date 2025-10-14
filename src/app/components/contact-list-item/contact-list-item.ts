import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contact-service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  index = input.required<number>();
  contacto = input.required<Contact>();

  contactsService = inject(ContactsService);

  confirmDelete() {
    Swal.fire({
      title: `Delete ${this.contacto().firstName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: "var(--color-error)",
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactsService.deleteContact(this.contacto().id);
      }
    });
  }
};
