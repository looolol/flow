import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Team } from '@prisma/client';
import { TeamDTO, TeamInfoDTO } from '@flow/shared';

type TeamCreateInput = Omit<Team, 'createdAt' | 'updatedAt'>;

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertFromTeam(team: TeamDTO): Promise<Team> {
    const existing = await this.prisma.team.findUnique({
      where: { id: team.id },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.team.create({
      data: this.mapToTeam(team),
    });
  }

  private mapToTeam(team: TeamDTO): TeamCreateInput {
    return {
      id: team.id,
      name: team.commonName.default,
      place: team.placeName.default,
      abbrev: team.abbrev,
      logo: team.logo,
    };
  }

  private mapToTeamInfo(team: Team): TeamInfoDTO {
    return {
      id: team.id,
      name: team.name,
      place: team.place,
      abbrev: team.abbrev,
      logo: team.logo,
    };
  }
}
