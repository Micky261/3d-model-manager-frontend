import {Component, Inject, OnInit} from "@angular/core";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Is used
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Is used
import {urlValidator} from "../../../shared/form-validators";
import {ToastService} from "../../core/error/toast.service";
import {ModelService} from "../../core/services/model.service";
import {Model} from "../../core/types/model.type";
import {ServerMessage} from "../../core/types/serverMessage.type";

@Component({
    selector: "app-create-model",
    templateUrl: "./create-model.component.html",
    styleUrls: ["./create-model.component.css"]
})
export class CreateModelComponent implements OnInit {
    creationMethod: string;

    uploadForm = new FormBuilder().group({
        name: ["", [Validators.required]],
        author: ["", [Validators.required]],
        description: [""],
        favorite: [false, [Validators.required]],
    });
    importForm = new FormBuilder().group({
        url: ["", [Validators.required, urlValidator]]
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

    startImport(): void {
        if (!this.importForm.get("url").valid) {
            this.toast.showValidationError("InvalidUrl");
            return;
        }

        this.modelService.importModel(this.importForm.get("url").value as string).subscribe(
            (message: ServerMessage) => {
                // TODO
            },
            error => {
                // TODO
            });
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

        const model = new Model(undefined,
            this.uploadForm.get("name").value as string, [],
            this.uploadForm.get("description").value as string, "",
            this.uploadForm.get("favorite").value as boolean,
            this.uploadForm.get("author").value as string, "");

        this.modelService.postModel(model).subscribe(
            (serverModel: Model) => {
                void this.router.navigate(["/model", serverModel.id]).then(() => true);
            },
            error => {
                console.log(error);
            });
    }
}
