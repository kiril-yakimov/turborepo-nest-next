import { Property } from '@mikro-orm/core';

export class Timestamp {
    @Property({
        fieldName: 'created_at',
        onCreate: () => new Date(),
    })
    public createdAt: Date = new Date();

    @Property({
        fieldName: 'updated_at',
        onUpdate: () => new Date(),
        default: null,
        nullable: true,
    })
    public updatedAt: Date | null = null;
}
