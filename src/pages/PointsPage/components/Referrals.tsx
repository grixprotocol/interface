import { Badge, HStack, Icon, IconButton, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaCopy, FaShare } from 'react-icons/fa';

import { useAffiliateLink } from '../hooks/useAffiliateLink';
import { PointsContainer } from '../utils';

export const Referrals = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { mutateAsync: generateLink, data: affiliateLink, isPending } = useAffiliateLink();

  const handleClick = async () => {
    if (isPending) return;

    const copyText = !affiliateLink ? await generateLink() : affiliateLink;
    void navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <PointsContainer h="130px">
      <HStack alignItems="flex-start" gap={4} w="full">
        <Icon as={FaShare} boxSize={6} mt={2} />
        <HStack justifyContent="space-between" w="full">
          <VStack alignItems="flex-start" spacing={2}>
            <PointsContainer.Title>Boost with Referrals</PointsContainer.Title>
            <Text fontSize={14}>Earn 10% of your friend&apos;s bonus points when they hit a milestone</Text>
          </VStack>
          <HStack spacing={2}>
            {affiliateLink && (
              <Badge variant="disabled" fontSize={12}>
                {affiliateLink.length > 30 ? `${affiliateLink.substring(0, 30)}...` : affiliateLink}
              </Badge>
            )}
            <Tooltip label="Copied to clipboard!" isOpen={isCopied} placement="top">
              <IconButton
                size="sm"
                w="fit-content"
                px={4}
                borderRadius="800px"
                variant="primaryGradient"
                aria-label="Generate link"
                icon={<Icon as={FaCopy} />}
                onClick={() => void handleClick()}
              />
            </Tooltip>
          </HStack>
        </HStack>
      </HStack>
    </PointsContainer>
  );
};
