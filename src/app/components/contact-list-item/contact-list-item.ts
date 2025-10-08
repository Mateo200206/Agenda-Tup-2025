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

  ngOnInit() {
    console.log('Contacto #' + this.index(), this.contacto());
    console.log('⭐ Es favorito?', this.contacto().isFavorite);
  }

  // showDeleteModal(){
  //     Swal.fire({
  //   title: "Are you sure?",
  //   text: "You won't be able to revert this!",
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Yes, delete it!"
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     this.contactsService.deleteContact(this.contacto().id).then(res=>.)
  //     Swal.fire({
  //       title: "Deleted!",
  //       text: "Your file has been deleted.",
  //       icon: "success"
  //     });
  //   }
  // });
}
