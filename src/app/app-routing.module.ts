import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
	imports: [RouterModule.forRoot([
		{
			path: "",
			loadChildren: () => import("./app.module").then(m => m.AppModule)
		}
	])],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {
}
