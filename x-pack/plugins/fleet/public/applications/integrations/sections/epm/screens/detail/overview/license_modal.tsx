/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import {
  EuiCodeBlock,
  EuiLoadingContent,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalFooter,
  EuiModalHeaderTitle,
  EuiButton,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';

import { useGetFileByPathQuery, useStartServices } from '../../../../../hooks';

interface Props {
  licenseName?: string;
  licensePath: string;
  onClose: () => void;
}

export const LicenseModal: React.FunctionComponent<Props> = ({
  licenseName = 'LICENSE.txt',
  licensePath,
  onClose,
}) => {
  const { notifications } = useStartServices();

  const { data: licenseText, error: licenseError } = useGetFileByPathQuery(licensePath);

  if (licenseError) {
    notifications.toasts.addError(licenseError, {
      title: i18n.translate('xpack.fleet.epm.errorLoadingLicense', {
        defaultMessage: 'Error loading license information',
      }),
    });
  }

  return (
    <EuiModal maxWidth={true} onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>{licenseName}</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiCodeBlock overflowHeight={360}>
          {licenseText ? (
            licenseText
          ) : (
            // Simulate a long text while loading
            <>
              <p>
                <EuiLoadingContent lines={5} />
              </p>
              <p>
                <EuiLoadingContent lines={6} />
              </p>
            </>
          )}
        </EuiCodeBlock>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton color="primary" fill onClick={onClose}>
          <FormattedMessage id="xpack.fleet.epm.licenseModalCloseBtn" defaultMessage="Close" />
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};
