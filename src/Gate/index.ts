/**
 * @slynova/fence
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { TGate, TResource } from '../Contracts'
import { formatResourceName } from '../Helpers'
import { Storage } from '../Storage'

const storage = Storage.instance

abstract class Gate {
  /**
   * Defines a new Gate.
   *
   * @param name     Name of the gate
   * @param callback Callback
   */
  public static define (name: string, callback: TGate): void {
    storage.storeGate(name, callback)
  }

  /**
   * Defines a new Policy.
   *
   * @param resource Resource to create policy for
   * @param policy   Policy assigned to the resource
   */
  public static policy (resource: TResource, policy: Function | object): void {
    const resourceName = Gate.$formatResourceName(resource)

    if (typeof policy === 'function') {
      // @ts-ignore
      policy = new policy() // tslint:disable-line
    }

    storage.storePolicy(resourceName, policy)
  }

  /**
   * Returns the name of a resource.
   *
   * @param  resource  Resource to search the name for
   */
  private static $formatResourceName (resource: TResource): string {
    return formatResourceName(resource)
  }
}

export { Gate }
