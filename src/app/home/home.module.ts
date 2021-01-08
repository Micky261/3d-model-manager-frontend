import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {HomeComponent} from "./home.component";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: HomeComponent
        }]),
        L10nTranslationModule,
    ]
})
export class HomeModule {
}
