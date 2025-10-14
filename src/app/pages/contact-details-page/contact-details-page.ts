import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../services/contact-service';
import { Contact } from '../../interfaces/contacto';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-contact-details-page',
  standalone: true,
  imports: [RouterLink, Spinner],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router);
  route = inject(ActivatedRoute); 

  contacto: Contact | null = null;
  isLoading = true;
  error: string | null = null;

  async ngOnInit() {
    // Obtener el ID desde la ruta
    const contactId = this.route.snapshot.paramMap.get('id'); 
    
    if (!contactId) {
      this.error = "ID de contacto no válido.";
      this.isLoading = false;
      return;
    }

    this.isLoading = true;

    try {
      const data = await this.contactsService.getContactById(contactId);
      console.log('📥 Datos recibidos:', data);
      
      if (data) {
        this.contacto = data;
      } else {
        this.error = "El contacto no pudo ser encontrado.";
        console.error('❌ No se encontró el contacto');
      }
    } catch (error) {
      console.error('❌ Error al cargar contacto:', error);
      this.error = "Error al cargar el contacto.";
    }
    
    this.isLoading = false;
    console.log('✅ Contacto final:', this.contacto);
  }
}