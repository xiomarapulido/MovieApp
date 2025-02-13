import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],  
  host: { class: 'app-layout' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {}
