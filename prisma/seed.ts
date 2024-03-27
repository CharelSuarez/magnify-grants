import { PrismaClient, Role } from '@prisma/client';
import { generateId } from 'lucia';
import { webcrypto } from 'node:crypto';
import { Argon2id } from 'oslo/password';

const db = new PrismaClient();

const main = async () => {
	globalThis.crypto = webcrypto as Crypto;

	console.log('Started Seeding');

	const id = generateId(15);

	await db.user.upsert({
		where: {
			email: 'admin@admin.com'
		},
		update: {},
		create: {
			id: id,
			email: 'admin@admin.com',
			emailVerified: true,
			hashedPassword: await new Argon2id().hash('admin'),
			role: Role.GRANT_ADMIN,
			gAdminInstance: {
				connectOrCreate: {
					where: {
						userId: id
					},
					create: {
						organization: {
							connectOrCreate: {
								where: {
									name: 'admin'
								},
								create: {
									name: 'admin',
									description: 'admin organization. use for tests'
								}
							}
						}
					}
				}
			},
			profile: {
				connectOrCreate: {
					where: {
						userId: id
					},
					create: {
						firstName: 'Admin FName',
						lastName: 'Admin LName',
						dateOfBirth: new Date('2000-01-01')
					}
				}
			}
		},
		include: {
			gAdminInstance: true,
			profile: true
		}
	});

	console.log('Finished Seeding');
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
