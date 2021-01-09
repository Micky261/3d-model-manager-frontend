import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {urlValidator} from "../../../shared/form-validators";
import {ToastService} from "../../core/error/toast.service";
import {ModelService} from "../../core/model.service";
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
        links: [""]
    });
    importForm = new FormBuilder().group({
        url: ["", [Validators.required, urlValidator]]
    });

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelService: ModelService
    ) {
    }

    ngOnInit(): void {
    }

    startImport(): void {
        if (!this.importForm.get("url").valid) {
            this.toast.showValidationError("InvalidUrl");

            return;
        }

        this.modelService.importModel(this.importForm.get("url").value).subscribe(
            (message: ServerMessage) => {
                // TODO
            },
            error => {
                // TODO
            });
    }
}
