import { Component, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { Player, PlayerPosition } from '../../models/player.model';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent implements OnInit {
  private playerService = inject(PlayerService);
  private fb = inject(FormBuilder);

  players: Player[] = [];
  groupId = 'PELADA-DOMINGO';

  showForm = false;
  playerForm!: FormGroup;

  positions = Object.values(PlayerPosition);

  ngOnInit(): void {
    this.initForm();
    this.loadPlayers();
  }

  initForm(): void {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(99)]],
      position: [PlayerPosition.MEIA, Validators.required],
      isPresent: [true],
    });
  }

loadPlayers(): void {
    this.playerService.getPlayersByGroup(this.groupId).subscribe({
      next: (data) => {
        console.log('⚽ DADOS QUE CHEGARAM DA API:', data);
        this.players = data; 
      },
      error: (err) => {
        console.error('❌ ERRO NA REQUISIÇÃO:', err);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.playerForm.reset({ position: PlayerPosition.MEIA, isPresent: true });
    }
  }

  onSubmit(): void {
    if (this.playerForm.valid) {
      const newPlayer: Player = {
        ...this.playerForm.value,
        groupId: this.groupId,
      };

      this.playerService.createPlayer(newPlayer).subscribe({
        next: () => {
          this.loadPlayers();
          this.toggleForm();
        },
        error: (err) => console.error('Erro ao salvar jogador', err),
      });
    }
  }

  deletePlayer(id: string | undefined, name: string): void {
    if (!id) return;
    if (confirm(`Deseja mesmo remover o craque ${name} do elenco?`)) {
      this.playerService.deletePlayer(id).subscribe({
        next: () => this.loadPlayers(),
        error: (err) => console.error('Erro ao deletar', err),
      });
    }
  }
}
