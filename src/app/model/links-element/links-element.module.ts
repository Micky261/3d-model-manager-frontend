import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {L10nTranslationModule} from "angular-l10n";
import {LinksElementComponent} from "./links-element.component";

@NgModule({
    declarations: [
        LinksElementComponent
    ],
  imports: [
    CommonModule,
    L10nTranslationModule
  ],
    exports: [
        LinksElementComponent
    ]
})
export class LinksElementModule {
}
