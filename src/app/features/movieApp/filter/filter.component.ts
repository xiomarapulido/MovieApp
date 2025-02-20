import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {

  @Input() availableOptions: string[] = [];  // Input for available options
  @Input() selectedOptionData: string[] = [];   // Input for selected optinons
  @Output() dataChange = new EventEmitter<string[]>();  // Event emitter to send the selected option back to the parent

  /**
   * Handles selection and emits the selected option to the parent.
   * @param event The select event triggered when option are selected.
   */
  onChangeData(event: Event): void {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    const selectedData = Array.from(selectedOptions).map(option => option.value);
    this.dataChange.emit(selectedData);  // Emit the selected data to the parent component
  }
}


