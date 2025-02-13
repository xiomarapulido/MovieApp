import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  host: { class: 'app-sidebar' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  isCollapsed = signal(false);

  toggleMenu() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}

