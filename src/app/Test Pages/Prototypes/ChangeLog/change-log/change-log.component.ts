import { Component, OnInit } from '@angular/core';
import { ClientModule } from '../../Client/client/client.module';
import { Subscription } from 'rxjs';
import { ClientsService } from '../../Client/clients.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fcid-change-log',
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.scss']
})
export class ChangeLogComponent implements OnInit {
  client: ClientModule;
  public clientId: number;
  public clientName: string = '';
  public serviceSubscription: Subscription;

  constructor(private route: ActivatedRoute, private clientService: ClientsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.clientId = + params.get('id'));
    this.serviceSubscription = this.clientService.fetchClient(this.clientId).subscribe((result) => {
      if (result == undefined || result == null) return;
      this.client = result;
      this.clientName = this.client.name;
    });
  }
}