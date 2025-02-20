import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-filter' },
})
export class FilterComponent {

 
  @Input() availableOptions: string[] = [];  
  @Input() selectedOptionData: string[] = []; 
  @Output() dataChange = new EventEmitter<string[]>();  

  /**
   * Toggles the selection of an option.
   * If the option is already selected, it is removed; otherwise, it is added.
   * @param option The selected genre option.
   */
  toggleSelection(option: string): void {
    const selectedSet = new Set(this.selectedOptionData);

    if (selectedSet.has(option)) {
      selectedSet.delete(option); // Deselect if already selected
    } else {
      selectedSet.add(option); // Select if not selected
    }

    this.selectedOptionData = Array.from(selectedSet);
    this.dataChange.emit(this.selectedOptionData); // Emit updated selection
  }

  /**
   * Clears all selected genres and emits an empty list to the parent.
   */
  clearSelection(): void {
    this.selectedOptionData = [];
    this.dataChange.emit(this.selectedOptionData); // Emit empty selection
  }
}


