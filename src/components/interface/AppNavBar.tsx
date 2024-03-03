import { Navbar, ScrollArea, Text } from '@mantine/core';
import merge from 'lodash.merge';
import { useEffect, useMemo, useRef } from 'react';
import ReactMarkdownWrapper from '../ReactMarkdownWrapper';
import { useStudyConfig } from '../../store/hooks/useStudyConfig';
import { useStoredAnswer } from '../../store/hooks/useStoredAnswer';
import ResponseBlock from '../response/ResponseBlock';
import { useCurrentStep } from '../../routes';
import { IndividualComponent } from '../../parser/types';
import { isInheritedComponent } from '../../parser/parser';

export default function AppNavBar() {
  const trialHasSideBar = useStudyConfig()?.uiConfig.sidebar;
  const trialHasSideBarResponses = true;

  // Get the config for the current step
  const studyConfig = useStudyConfig();
  const currentStep = useCurrentStep();
  const stepConfig = studyConfig.components[currentStep];

  const currentConfig = useMemo(() => {
    if (stepConfig) {
      return isInheritedComponent(stepConfig) && studyConfig.baseComponents
        ? (merge(
          {},
          studyConfig.baseComponents?.[stepConfig.baseComponent],
          stepConfig,
        ) as IndividualComponent)
        : (stepConfig as IndividualComponent);
    }

    return null;
  }, [stepConfig]);

  const status = useStoredAnswer();
  const instruction = currentConfig?.instruction || '';

  const instructionInSideBar = currentConfig?.instructionLocation === 'sidebar'
    || currentConfig?.instructionLocation === undefined;

  const viewport = useRef<HTMLDivElement>(null);
  const scrollUp = () => viewport.current?.scrollTo({ top: 0 });

  useEffect(() => {
    scrollUp();
  }, [currentStep]);

  return trialHasSideBar && currentConfig ? (
    <Navbar bg="gray.1" display="block" width={{ base: 600 }} style={{ zIndex: 0, overflowY: 'scroll' }}>
      <ScrollArea h={700} viewportRef={viewport}>
        {instructionInSideBar && instruction !== '' && (
        <Navbar.Section
          bg="gray.3"
          p="xl"
        >
          <Text c="gray.9">
            <Text span c="orange.8" fw={700} inherit>
              Task:
            </Text>
            <ReactMarkdownWrapper text={instruction} />
          </Text>
        </Navbar.Section>
        )}

        {trialHasSideBarResponses && (
        <Navbar.Section p="xl">
          <ResponseBlock
            key={`${currentStep}-sidebar-response-block`}
            status={status}
            config={currentConfig}
            location="sidebar"
          />
        </Navbar.Section>
        )}
      </ScrollArea>

    </Navbar>
  ) : (
    <ResponseBlock
      key={`${currentStep}-sidebar-response-block`}
      status={status}
      config={currentConfig}
      location="sidebar"
      style={{ display: 'hidden' }}
    />
  );
}
