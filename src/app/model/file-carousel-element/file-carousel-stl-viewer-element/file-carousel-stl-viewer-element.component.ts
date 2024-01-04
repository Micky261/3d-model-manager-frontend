import {Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {StlModelViewerComponent} from "angular-stl-model-viewer";
import {Observable} from "rxjs";
import {MeshPhongMaterial, Scene, WebGLRenderer} from "three";
import {Environment} from "../../../../environment";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
    selector: "file-carousel-stl-viewer-element",
    templateUrl: "./file-carousel-stl-viewer-element.component.html",
    styleUrls: ["./file-carousel-stl-viewer-element.component.css"]
})
export class FileCarouselStlViewerElementComponent implements OnInit {
    threeRenderer: WebGLRenderer = new WebGLRenderer({alpha: true, antialias: true});
    threeScene: Scene = new Scene();
    threeMaterial: MeshPhongMaterial = new MeshPhongMaterial({color: 0xa40365, shininess: 10, specular: 0x0d5a99});

    sessionName = AuthService.sessionCookieName;
    sessionId: string;
    apiUrl = Environment.apiUrl;

    @Input() fileId: number;
    @Input() activationEvent: Observable<any>;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.sessionId = this.authService.getSession();

        this.threeRenderer.setClearColor("rgb(0,0,0)", 0);
        this.threeScene.background = null;
        this.setRendererSize();

        this.activationEvent.subscribe(() => window.dispatchEvent(new Event("resize")));
    }

    setRendererSize() {
        this.threeRenderer.setSize(
            window.innerWidth * ((window.innerWidth <= 768) ? 0.9 : 0.7), // Breakpoint md
            window.innerHeight * 0.49
        );
    }
}
