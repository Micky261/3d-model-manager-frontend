import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {MarkdownModule} from "ngx-markdown";
import {LinksElementModule} from "../links-element/links-element.module";
import {TagsElementModule} from "../tags-element/tags-element.module";
import {UploadElementModule} from "../upload-element/upload-element.module";
import {ShowComponent} from "./show.component";
import {AutosizeModule} from "ngx-autosize";

@NgModule({
    declarations: [
        ShowComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: ShowComponent
        }]),
        L10nTranslationModule,
        ReactiveFormsModule,
        TagsElementModule,
        LinksElementModule,
        MarkdownModule,
        AutosizeModule,
        UploadElementModule,
    ]
})
export class ShowModule {
}
