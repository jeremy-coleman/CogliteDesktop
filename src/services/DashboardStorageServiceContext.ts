import { Context } from '@coglite/apphost';
import { IStorageService } from '@coglite/apphost';

const DashboardStorageServiceContext = new Context<IStorageService>();

export { DashboardStorageServiceContext }