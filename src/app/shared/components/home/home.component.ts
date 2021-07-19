import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Box } from '../../models/box.model';
import { BoxFormComponent } from './../box-form/box-form.component';
import { BoxService } from './../../services/box.service';
import { BoxJoinComponent } from '../box-join/box-join.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [BoxService]
})
export class HomeComponent implements OnInit {
    boxes: Box[] = [];
    featuredBoxes: Box[] = [];
    loading = true;

    constructor(public router: Router,
        private modalService: NgbModal,
        public boxService: BoxService) { }

    ngOnInit() {
        this.boxService.index().subscribe(
            boxes => {
                this.featuredBoxes = boxes.filter(box => box.featured)
                this.boxes = boxes;
                this.loading = false;
            },
            error => console.log(error)
        );
    }

    /**
     * When the user clicks on the widget box, he enters the box
     *
     * @param token The Mongo _id of the box
     * @memberof HomeComponent
     */
    enter(token: string) {
        this.router.navigate(['box/', token]);
    }

    openJoinModal() {
        const modalRef = this.modalService.open(BoxJoinComponent);
    }

    openCreateModal() {
        const modalRef = this.modalService.open(BoxFormComponent, { size: 'xl' });
        modalRef.componentInstance.title = 'Create a box';
    }
}
