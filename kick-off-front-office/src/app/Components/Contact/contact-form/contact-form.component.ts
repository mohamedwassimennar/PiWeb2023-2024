import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  contactForm: FormGroup;
  submitted = false;
  success = false;

 
  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      message: ['', Validators.required]
    });
  }


  get form() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.contactService.sendContactForm(this.contactForm.value)
      .subscribe(
        response => {
          this.success = true;
          this.contactForm.reset();
          this.submitted = false;
          console.log(' Message envoyé avec succès')
        },
        error => {
          console.error('Une erreur s\'est produite lors de l\'envoi du formulaire de contact :', error);
        }
      );
  }
}