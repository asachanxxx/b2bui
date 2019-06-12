import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { SystemMessages } from '../shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private messages: SystemMessages,
        private toastr: ToastrService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    Login() {
        this.router.navigate(['home'])
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(["home"]);
                },
                error => {
                  
                    this.router.navigate(["home"]);
                    // this.loading = false;
                    // console.log("error" , error.status)
                    // if(error.status== 0){
                    //     this.error = this.messages.DataserviceNotAvaibale;
                    //     this.toastr.error(this.messages.DataserviceNotAvaibale, this.messages.MessageCaption);
                    // }else{
                    //     this.toastr.error(this.messages.GenaralError, this.messages.MessageCaption);
                    // }

                });
    }


}
