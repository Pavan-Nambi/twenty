import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import {
  WorkflowManualTriggerAvailability,
  WorkflowManualTriggerSettings,
} from '@/workflow/types/Workflow';
import { assertUnreachable } from '@/workflow/utils/assertUnreachable';
import { COMMAND_MENU_DEFAULT_ICON } from '@/workflow/workflow-trigger/constants/CommandMenuDefaultIcon';

export const getManualTriggerDefaultSettings = ({
  availability,
  activeNonSystemObjectMetadataItems,
  icon,
}: {
  availability: WorkflowManualTriggerAvailability;
  activeNonSystemObjectMetadataItems: ObjectMetadataItem[];
  icon?: string;
}): WorkflowManualTriggerSettings => {
  const defaultSettings = {
    outputSchema: {},
    icon: icon || COMMAND_MENU_DEFAULT_ICON,
    isPinned: false,
  };
  switch (availability) {
    case 'EVERYWHERE': {
      return {
        ...defaultSettings,
        objectType: undefined,
      };
    }
    case 'WHEN_RECORD_SELECTED': {
      return {
        ...defaultSettings,
        objectType: activeNonSystemObjectMetadataItems[0].nameSingular,
      };
    }
  }

  return assertUnreachable(availability);
};
