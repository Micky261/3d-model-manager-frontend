import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ToastService} from "../../../core/error/toast.service";
import {ModelService} from "../../../core/services/model.service";
import {Model} from "../../../core/types/model.type";

@Component({
    selector: "app-create-form-element",
    templateUrl: "./create-form-element.component.html",
    styleUrls: ["./create-form-element.component.css"]
})
export class CreateFormElementComponent implements OnInit {
    uploadForm = new FormBuilder().group({
        name: ["", [Validators.required]],
        author: ["", [Validators.required]],
        description: [""],
        favorite: [false, [Validators.required]],
    });

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelService: ModelService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
    }

    createModel(): void {
        if (!this.uploadForm.get("name").valid) {
            this.toast.showValidationError("EnterName");
            return;
        }
        if (!this.uploadForm.get("author").valid) {
            this.toast.showValidationError("EnterAuthor");
            return;
        }
        if (!this.uploadForm.get("favorite").valid) {
            this.toast.showValidationError("EnterFavorite");
            return;
        }

        const model = new Model(undefined, undefined,
            this.uploadForm.get("name").value, [],
            this.uploadForm.get("description").value, "",
            this.uploadForm.get("favorite").value,
            this.uploadForm.get("author").value, "");

        this.modelService.postModel(model).subscribe({
            next: (serverModel: Model) => {
                void this.router.navigate(["/model", serverModel.id]).then(() => true);
            },
            error: error => {
                console.log(error);
            }
        });
    }
}

