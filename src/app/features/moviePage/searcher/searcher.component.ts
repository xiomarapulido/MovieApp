import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearcherComponent {

  @Input() searchTerm = ''; 
  @Output() searchChange = new EventEmitter<string>();

  /**
   * Emits the updated search term when user types in the input field.
   * @param event The input event
   */
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value);
  }

}
