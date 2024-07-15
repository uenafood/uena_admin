import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelizeOutlet } from '../config.js';
import { ListActionResponse, RecordActionResponse, ResourceWithOptions } from 'adminjs';
import { parentOutlet } from '../../admin/constants.js';
import { disableAllActions } from '../../admin/features/disableAllActions.js';
import { OutletTable } from './outlet.entity.js';
import { dayToNum, numToDay } from '../../admin/utils.js';

export class OutletOperationalHourTable extends Model<
  InferAttributes<OutletOperationalHourTable>,
  InferCreationAttributes<OutletOperationalHourTable>
> {
  declare id: CreationOptional<number>;
  declare outlet_id: number;
  declare opening_hour: string;
  declare closing_hour: string;
  declare is_temporary_closed: boolean;
  declare day: number;
}

export function setupOutletOperationalHourTable() {
  OutletOperationalHourTable.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelizeOutlet.literal("nextval('outlet_operational_hour_seq'::regclass)"),
      },
      outlet_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      opening_hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closing_hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      is_temporary_closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeOutlet,
      modelName: 'OutletOperationalHour',
      tableName: 'outlet_operational_hour',
      timestamps: false,
    },
  );
}

export function wiringOutletOperationalHourTableRelations() {
  OutletOperationalHourTable.belongsTo(OutletTable, {
    foreignKey: 'outlet_id',
    targetKey: 'id',
  });
}

export const outletOperationalHourTableResource: ResourceWithOptions = {
  resource: OutletOperationalHourTable,
  // features: [disableAllActions()],
  options: {
    id: 'outlet_operational_hour',
    parent: parentOutlet,
    properties: {
      day: {
        type: 'string',
        isDisabled: true,
      },
    },
    actions: {
      list: {
        after: async (response: ListActionResponse) => {
          const promises = response.records.map(async (record) => {
            record.params.day = numToDay(record.params.day);
          });

          await Promise.all(promises);
          return response;
        },
      },
      show: {
        isVisible: true,
        after: async (response: RecordActionResponse) => ({
          ...response,
          record: {
            ...response.record,
            params: {
              ...response.record.params,
              day: numToDay(response.record.params.day),
            },
          },
        }),
      },
      edit: {
        before: async (request) => {
          if (request.payload?.day) {
            request.payload.day = dayToNum(request.payload.day);
          }
          return request;
        },
        after: async (response: RecordActionResponse) => ({
          ...response,
          record: {
            ...response.record,
            params: {
              ...response.record.params,
              day: numToDay(response.record.params.day),
            },
          },
        }),
      },
    },
  },
};
