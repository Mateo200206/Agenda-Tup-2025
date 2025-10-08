import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login';
import { RegisterPage } from './pages/register-page/register-page';
import { ContactListPage } from './pages/contact-list-page/contact-list-page';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { LoggedLayout } from './layout/logged-layout/logged-layout';
import { onlyPublicGuard } from './guards/only-public-guard-guard';
import { onlyUserGuard } from './guards/only-user-guard-guard';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';

export const routes: Routes = [
    {
        path:"login",
        component: LoginPage,
        canActivate: [onlyPublicGuard]
    },
    {
        path:"register-page",
        component: RegisterPage,
        canActivate: [onlyPublicGuard]

    },
    {
        // Path vacío se abre cuando la página no tiene url más que localhost
        path:"",
        component: LoggedLayout,
        canActivateChild: [onlyUserGuard],
        children: [
            {
                path:"",
                component: ContactListPage
            },
            {
                path:"contacts/new",
                component: NewEditContact
            },
            {
                path:"contacts/:idContacto/edit",
                component: NewEditContact
            },
            {
                path:"contacts/:id",
                component: ContactDetailsPage
            },
        ]
    },
];
